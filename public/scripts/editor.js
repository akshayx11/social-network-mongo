$(function () {
    var quill = new Quill('#editor', {
                        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['link', 'blockquote', 'code-block', 'image'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                ['clean']        
            ]
        },
        placeholder: '  Start writing your story......',
        theme: 'snow'
    });

    quill.focus();
    
});