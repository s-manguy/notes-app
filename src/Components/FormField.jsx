import { forwardRef, memo } from "react";

const FormField = memo(forwardRef(function FormField ({tagName, label, id, placeholder, row}, ref) {
   if (tagName === 'input') {
        return (
            <>
            <label htmlFor={id} className='sr-only'>{label}</label>
            <input 
                id={id}
                name={id}
                ref={ref}
                type='text' 
                placeholder={placeholder}
                required />
            </>
        )
   }
   if (tagName === 'textarea')  {
        return (
            <>
            <label htmlFor={id} className='sr-only'>{label}</label>
            <textarea 
                id={id}
                name={id}
                ref={ref}
                placeholder={placeholder}
                row={row} 
                required />
            </>
        )
   }
}));

export default FormField;


// Previous code when is App
/* <label htmlFor="title"  className='sr-only'>Note Title</label>
    <input 
        id="title"
        name="title"
        ref={titleRef}
        type='text' 
        placeholder='Title' 
        required />
    <label htmlFor="content" className='sr-only'>Note Title</label>
    <textarea 
        id="content"
        name="content"
        ref={contentRef}
        placeholder='Content' 
        row={10} 
        required /> 
*/