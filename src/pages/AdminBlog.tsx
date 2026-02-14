import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { BlogPostList } from '@/components/admin/blog/BlogPostList';
import { BlogPostEditor } from '@/components/admin/blog/BlogPostEditor';

export default function AdminBlog() {
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleNew = () => {
    setEditingId(null);
    setView('editor');
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setView('editor');
  };

  const handleBack = () => {
    setView('list');
    setEditingId(null);
  };

  return (
    <AdminLayout>
      {view === 'list' ? (
        <BlogPostList onNew={handleNew} onEdit={handleEdit} />
      ) : (
        <BlogPostEditor postId={editingId} onBack={handleBack} />
      )}
    </AdminLayout>
  );
}
