import { NextResponse } from 'next/server';
import { getSortedPostsData } from '@/data/blog';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// GET /api/blog - Get all blog posts
export async function GET() {
  try {
    const posts = getSortedPostsData();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create a new blog post
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.content || !data.date || !data.excerpt) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a slug from the title
    const slug = data.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/gi, '-');
    
    // Check if a post with this slug already exists
    const postsDirectory = path.join(process.cwd(), 'src/data/posts');
    const filePath = path.join(postsDirectory, `${slug}.md`);
    
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: 'A post with this title already exists' },
        { status: 409 }
      );
    }

    // Format the frontmatter
    const frontmatter = {
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      tags: data.tags || [],
      featured: data.featured || false,
    };

    // Create the markdown content
    const markdown = matter.stringify(data.content, frontmatter);

    // Write the file
    fs.writeFileSync(filePath, markdown);

    return NextResponse.json(
      { message: 'Post created successfully', slug },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
