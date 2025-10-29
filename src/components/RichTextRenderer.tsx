import { useMemo } from 'react';

interface RichTextRendererProps {
  content: string;
  className?: string;
  maxLength?: number;
  hideHtmlInPreview?: boolean; // Option to hide HTML content in preview cards
}

/**
 * Component to render both plain text and HTML rich content
 * Detects if content is HTML and renders appropriately
 */
export function RichTextRenderer({ content, className = '', maxLength, hideHtmlInPreview = false }: RichTextRendererProps) {
  const processedContent = useMemo(() => {
    if (!content) return { isHtml: false, content: '', shouldRender: true };

    // Check if content contains HTML tags
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);

    // If it's HTML and we're in preview mode (maxLength is set), handle specially
    if (maxLength && isHtml) {
      if (hideHtmlInPreview) {
        // Don't render HTML in preview at all
        return { isHtml: false, content: '', shouldRender: false };
      }

      // Strip HTML tags and truncate for preview
      const textOnly = content.replace(/<[^>]*>/g, '').trim();
      const truncatedText = textOnly.length > maxLength ? textOnly.substring(0, maxLength) + '...' : textOnly;
      return { isHtml: false, content: truncatedText, shouldRender: truncatedText.length > 0 };
    }

    if (maxLength && !isHtml) {
      // Truncate plain text if needed
      return {
        isHtml: false,
        content: content.length > maxLength ? content.substring(0, maxLength) + '...' : content,
        shouldRender: true,
      };
    }

    return { isHtml, content, shouldRender: true };
  }, [content, maxLength, hideHtmlInPreview]);

  if (!processedContent.shouldRender) {
    return null;
  }

  if (processedContent.isHtml) {
    return (
      <div
        className={`rich-text-content ${className}`}
        dangerouslySetInnerHTML={{ __html: processedContent.content }}
      />
    );
  }

  return <p className={className}>{processedContent.content}</p>;
}
