'use client'
export default function Bedge({ 
    children, 
    title, 
    style, 
    showAddBtn=false,
    onAddNew
}) {

    return (
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
        Badge
      </span>
    );
  }
  