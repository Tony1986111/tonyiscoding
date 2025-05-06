import { NextResponse } from 'next/server';
import { getPostData } from '@/data/blog';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// GET /api/blog/[slug] - Get a specific blog post
export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const post = await getPostData(slug);
    
    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error(`Error fetching blog post ${params.slug}:`, error);
    return NextResponse.json(
      { message: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[slug] - Update a blog post
export async function PUT(request, { params }) {
  try {
    const { slug } = params;
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.content || !data.date || !data.excerpt) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const postsDirectory = path.join(process.cwd(), 'src/data/posts');
    const filePath = path.join(postsDirectory, `${slug}.md`);
    
    // Check if the post exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
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
      { message: 'Post updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error updating blog post ${params.slug}:`, error);
    return NextResponse.json(
      { message: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[slug] - Delete a blog post
export async function DELETE(request, { params }) {
  try {
    const { slug } = params;
    const postsDirectory = path.join(process.cwd(), 'src/data/posts');
    const filePath = path.join(postsDirectory, `${slug}.md`);
    
    // Check if the post exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Delete the file
    fs.unlinkSync(filePath);
    
    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting blog post ${params.slug}:`, error);
    return NextResponse.json(
      { message: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
