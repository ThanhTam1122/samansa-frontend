'use client';

import { useParams } from 'next/navigation';
import { CategoryTemplate } from '@/components/templates/CategoryTemplate';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  return <CategoryTemplate categoryId={categoryId} />;
}
