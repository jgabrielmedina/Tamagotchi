import "../Modal.css";

const Modal = ({children, isOpen, closeModal, title}) => {
    return(
        <article className={`modal  ${isOpen&&"is-open "}`} >
            <div className="relative bg-white rounded-3xl">
                <button className="absolute top-1 right-1" onClick={()=>closeModal()}>x</button>
                <h1>{title}</h1>
                 {children}
            </div>
        </article>
    )
}

export default Modal; 