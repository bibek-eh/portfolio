// Script file of portfolio

        const menuToggle = document.getElementById("menu-toggle");
        const navMenu = document.getElementById("nav-menu");
        const menuIcon = menuToggle.querySelector("i");

        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            if (navMenu.classList.contains("active")) {
                menuIcon.classList.remove("fa-bars");
                menuIcon.classList.add("fa-xmark");
            } else {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }
        });

        // Close menu when clicking links
        document.querySelectorAll(".nav a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            });
        });

        const textElement =
            document.getElementById("typing-text");

        const texts = [
            "Ethical Hacker",
            "Web Developer",
            "Programmer",
            "Tech Enthusiast",
            "Cybersecurity Researcher"
        ];

        let textIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            let currentText = texts[textIndex];

            if (!deleting) {

                textElement.textContent =
                    currentText.substring(0, charIndex++);

                if (charIndex > currentText.length) {

                    deleting = true;

                    setTimeout(typeEffect, 1200);

                    return;
                }

            }
            else {

                textElement.textContent =
                    currentText.substring(0, charIndex--);

                if (charIndex < 0) {

                    deleting = false;

                    textIndex =
                        (textIndex + 1) % texts.length;
                }
            }

            setTimeout(typeEffect,
                deleting ? 70 : 120);

        }

        typeEffect();

        const contactForm = document.getElementById("contact-form");
        const formStatus = document.getElementById("form-status");

        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const sendButton = contactForm.querySelector(".send-btn");
            sendButton.disabled = true;
            sendButton.textContent = "Sending...";
            formStatus.textContent = "";

            const formData = new FormData(contactForm);
            formData.append("_subject", "New Portfolio Message for Bibek");
            formData.append("_replyto", formData.get("email"));
            formData.append("_captcha", "false");
            formData.append("_template", "table");

            try {
                const response = await fetch(
                    "https://formsubmit.co/ajax/dhawalbibek7@gmail.com",
                    {
                        method: "POST",
                        headers: {
                            "Accept": "application/json"
                        },
                        body: formData
                    }
                );

                const result = await response.json();

                if (!response.ok || result.success === false) {
                    throw new Error(result.message || "Form submission failed");
                }

                formStatus.textContent =
                    "Message sent successfully! Thank you for contacting me.";
                contactForm.reset();
            } catch (error) {
                console.error("Contact form error:", error);
                formStatus.textContent =
                    "Message could not be sent. Please check your details and try again.";
            } finally {
                sendButton.disabled = false;
                sendButton.textContent = "Send Message";
            }
        }); 
