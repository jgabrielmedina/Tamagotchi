import "../Modal.css";

const Modal = ({children, isOpen, closeModal, title}) => {
    return(
        <article className={`modal  ${isOpen&&"is-open "}`} >
            <div className="relative bg-white rounded-3xl">
                <button className="text-xl md:text-lg  absolute top-1 right-3" onClick={()=>closeModal()}>x</button>
                <h1>{title}</h1>
                 {children}
            </div>
        </article>
    )
}

export default Modal; 