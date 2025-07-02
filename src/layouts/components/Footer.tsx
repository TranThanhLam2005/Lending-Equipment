const Footer = () => {
    return (
        <div className="min-h-40 bg-neutral-950 md:block hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 text-white">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">About Us</h3>
                    <p className="text-sm">I am a software engineer provide the website for school manage their property.</p>
                </div>
                <div className="flex flex-col gap-y-2">
                    <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                    <p className="text-sm ">Presentative: 
                        <span className="font-light"> Tran Thanh Lam</span>
                    </p>
                    <p className="text-sm">Phone: 
                        <span className="font-light"> 0123456789</span>
                    </p>
                    <p className="text-sm">Hotline: 
                        <span className="font-light"> 0123456789</span>
                    </p>
                    <p className="text-sm">Email: 
                        <span className="font-light"> s4038329@gmail.com</span>
                    </p>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">Address</h3>
                    <p className="text-sm ">Ta Quang Buu</p>
                    <p className="text-sm">Viet Nam</p>
                    <p className="text-sm">District 8</p>
                    <p className="text-sm">Pham Hung</p>
                </div>
            </div>
            <div className="text-center text-gray-400 py-6 border-t border-gray-700">
                @2025 Lending App by Tran Thanh Lam. All rights reserved.
            </div>
        </div>
    )
}

export default Footer;