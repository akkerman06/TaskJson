

//Компонент для показа 6 скелетов семинара пока loading = true
export const SkeletonSeminars = () => {
    return Array(6).fill(null).map((_, id) => (
        <div
            key={`skeleton-${id}`}
            className="bg-gray-200 w-full max-w-[388px] rounded-2xl p-6 shadow animate-pulse"
        >
            <div className="w-full max-w-[340px] flex flex-col gap-3">
                <div className="h-56 w-full max-w-[340px] bg-gray-300 rounded-2xl"></div>
                <div className="w-full flex flex-col gap-1 h-56">
                    <div className="h-8 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-24 bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-1 mt-auto">
                        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                        <div className="h-4 w-6 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    ));
};