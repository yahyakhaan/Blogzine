const Spinner = () => {
    return (
        <div className="bg-black bg-opacity-75 h-screen flex justify-center items-center">
            <div class="text-center text-white">
                <div className="uppercase relative top-32 text-2xl">
                    Loading{' '}<b>...</b>
                </div>
                <div class="spinner-border w-64 h-64" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Spinner;