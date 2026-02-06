const currentUrl = window.location.href;
const everything = currentUrl.split('?');

if (everything.length > 1) {
    const formData = everything[1].split('&');

    function show(key) {
        formData.forEach((element) => {
            const currentKey = element.split('=')[0];
        
        if (currentKey === key) {
            let value = element.split('=')[1];
            value = decodeURIComponent(value.replace(/\+/g, ' '));
            
            const targetElement = document.querySelector(`#res-${key}`);
            if (targetElement) {
                if (key === "timestamp" && value !== "") {
                        const date = new Date(value);
                        targetElement.textContent = date.toLocaleString();
                    } else {
                        targetElement.textContent = value;
                    }
            }
            }
        });
    }
    show("fname");
    show("lname");
    show("email");
    show("phone");
    show("organization");
    show("timestamp");
}
