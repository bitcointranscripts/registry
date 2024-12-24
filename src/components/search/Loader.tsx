function SkeletonLoader() {
  return (
    <div className="border border-gray-custom-1200 rounded-lg p-4 md:p-5 2xl:p-6 flex flex-col gap-3 md:gap-4">
      <div className="space-y-2 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export function SkeletonResults({count} : {count: number}) {
  return (
    <div className='flex flex-col gap-6 pb-8'>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonLoader key={i} />
      ))}
    </div>
  )
}
