const contactForm = document.querySelector('form');

contactForm.addEventListener('submit', e => {
    e.preventDefault();


    const form = e.target;
    const formData = new FormData(form)

    const data = Object.fromEntries(formData.entries())

    const link = document.createElement('a');

    link.href=`mailto:leo@gmail.com?subject=${data.subject}&body=Selamat siang. Nama saya ${data.name}.%0D%0ASilahkan hubungi saya di ${data.email} atau ${data.phoneNumber}. Skill saya adalah ${data.skill}. Berikut pesan saya : ${data.message}`

    link.click();
    contactForm.reset();
})