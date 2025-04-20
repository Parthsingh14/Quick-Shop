function Loading() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#F9F5F0] to-[#F0E6DD] flex flex-col justify-center items-center gap-8 p-4">
            {/* Enhanced animated spinner with gradient */}
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-[#E8D9C8] rounded-full"></div>
                <div 
                    className="absolute inset-0 border-4 border-t-transparent rounded-full animate-spin"
                    style={{
                        borderImage: 'linear-gradient(to right, #714329, #B9937B) 1',
                        animationDuration: '1.2s'
                    }}
                ></div>
                <div className="absolute inset-2 border-4 border-[#F0E6DD] rounded-full"></div>
            </div>
            
            {/* Loading text with refined animations */}
            <div className="text-center space-y-3 max-w-md">
                <h1 className="text-3xl md:text-4xl font-medium text-[#714329]">
                    <span className="inline-block animate-wave" style={{ animationDelay: '0.1s' }}>L</span>
                    <span className="inline-block animate-wave" style={{ animationDelay: '0.2s' }}>o</span>
                    <span className="inline-block animate-wave" style={{ animationDelay: '0.3s' }}>a</span>
                    <span className="inline-block animate-wave" style={{ animationDelay: '0.4s' }}>d</span>
                    <span className="inline-block animate-wave" style={{ animationDelay: '0.5s' }}>i</span>
                    <span className="inline-block animate-wave" style={{ animationDelay: '0.6s' }}>n</span>
                    <span className="inline-block animate-wave" style={{ animationDelay: '0.7s' }}>g</span>
                </h1>
                <p className="text-[#B5A192] text-lg md:text-xl">
                    <span className="animate-fadeIn" style={{ animationDelay: '1s' }}>
                        Preparing your shopping experience...
                    </span>
                </p>
            </div>

            {/* CSS for custom animations */}
            <style jsx>{`
                @keyframes wave {
                    0%, 40%, 100% { transform: translateY(0) }
                    20% { transform: translateY(-10px) }
                }
                .animate-wave {
                    animation: wave 1.5s ease-in-out infinite;
                    display: inline-block;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 1s ease-out forwards;
                }
            `}</style>
        </div>
    )
}

export default Loading