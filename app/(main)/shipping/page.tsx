import React from "react";


const Shipping = ()=>{
    return(
        <div className="py-14 w-full contain space-y-8 lg:space-y-[72px]">
            <div className="flex flex-col lg:flex-row gap-y-6 lg:gap-0 justify-between lg:items-center ">
                <h1 className=" heading leading-[60px] ">Shipping & Delivery</h1>
            </div>
            <div className="lg:px-14 flex flex-col gap-y-8 lg:items-start ">
                <div className="px-7">
                    <ul className="list-disc">
                        <li className="font-semibold leading-loose lg:text-lg md:text-lg text-base">The delivery of the artworks is made at the address provided on the order summary form, during the business hours and according to the procedures laid down by the carrier chosen upon ordering.
                        </li>
                        <br></br>
                        <li className="font-semibold leading-loose lg:text-lg md:text-lg text-base">The individual artists are responsible for the dispatch and packaging of your order. Your order shall be sent to you directly from the artist. Delivery methods, costs, and estimated time for delivery shall vary according to the delivery methods offered by each individual artist. We confirm the packaging with the artist before shipping and take care to make sure that the work is properly protected. The delivery of the artwork will also be insured.
                        </li>
                        <br></br>
                        <li className="font-semibold leading-loose lg:text-lg md:text-lg text-base">Usually, the delivery takes on a maximum of up to 14 working days. Our artists will endeavour to dispatch the artwork within seven working days of confirmation of the order, although this cannot be guaranteed and time shall not be of the essence. The time may also vary depending on the artist´s availability, potential printing and framing of the work and the distance between the artist´s studio and your home. Whatever happens, the collection – gallery of digital art will keep you updated.
                        </li>
                        <br></br>
                        <li className="font-semibold leading-loose lg:text-lg md:text-lg text-base">Obligations regarding the delivery of the order, meaning respecting the given schedules, the quality of the packaging for the artwork, as well as the conformity of the latter are the sole responsibility of the buyer, the collection – gallery of digital art shall in no case be held liable for failure to comply by the buyer, who is entitled to lodge a complaint against the delivery service provider. This also means that the collection – gallery of digital art is not liable for any loss, delay or damage to the artwork.
                        </li>
                        <br></br>
                        <li className="font-semibold leading-loose lg:text-lg md:text-lg text-base">The buyer must, as soon as he/she receives the order, check the condition of the artwork, and mention any reservation immediately in writing and including photographs of the state of the delivered artwork, at the latest within 48 hours, to the collection – gallery of digital art.</li>
                        <br></br>
                        <li className="font-semibold leading-loose lg:text-lg md:text-lg text-base">The delivery costs are paid by the buyer and vary based on the dimensions as well as the weight of the delivered artwork and also depend on the destination (since the artworks are delivered globally).</li>
                        <br></br>
                        <li className="font-semibold leading-loose lg:text-lg md:text-lg text-base">Depending on the destination, your shipment may be subject to Customs and Excise Duty as well as Value Added Tax payment. The regulations differ from country to country.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Shipping