import { NextResponse } from 'next/server';
import { remark } from 'remark';
import html from 'remark-html';

export async function POST(request) {
  try {
    const { markdown } = await request.json();
    
    if (!markdown) {
      return NextResponse.json(
        { message: 'Markdown content is required' },
        { status: 400 }
      );
    }
    
    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(markdown);
    
    const htmlContent = processedContent.toString();
    
    return NextResponse.json({ html: htmlContent });
  } catch (error) {
    console.error('Error rendering markdown:', error);
    return NextResponse.json(
      { message: 'Failed to render markdown' },
      { status: 500 }
    );
  }
}
