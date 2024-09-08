$(document).ready(function () {
    // Sliding effect for the slider
    let currentIndex = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.eq(index).fadeIn(500).siblings().fadeOut(500);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    // Initial slide display
    showSlide(currentIndex);

    // Set interval for automatic sliding
    setInterval(nextSlide, 3000);

    // Handle navigation clicks
    $('.nav-links a').on('click', function (event) {
        event.preventDefault();
        const targetId = $(this).attr('href');

        // Hide all sections
        $('main section').hide();

        // Show the targeted section
        $(targetId).show();
    });

    // Handle contact form submission
    $('#contactForm').on('submit', function (event) {
        event.preventDefault();
        const formData = {
            email: $('#contactEmail').val(),
            message: $('#contactMessage').val(),
        };

        $.ajax({
            url: '/contact',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                $('#responseMessage').text(response.message);
                $('#contactForm')[0].reset();
            },
            error: function () {
                $('#responseMessage').text('Error sending the message.');
            },
        });
    });

    // Handle sign-up form submission
    $('#signupForm').on('submit', function (event) {
        event.preventDefault();
        const formData = {
            name: $('#signupName').val(),
            email: $('#signupEmail').val(),
            password: $('#signupPassword').val(),
        };

        $.ajax({
            url: '/signup',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                $('#signupResponseMessage').text(response.message);
                $('#signupForm')[0].reset();
            },
            error: function () {
                $('#signupResponseMessage').text('Error signing up.');
            },
        });
    });

    // Handle sign-in form submission
    $('#signinForm').on('submit', function (event) {
        event.preventDefault();
        const formData = {
            email: $('#signinEmail').val(),
            password: $('#signinPassword').val(),
        };

        $.ajax({
            url: '/signin',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                $('#signinResponseMessage').text(response.message);
                $('#signinForm')[0].reset();
            },
            error: function () {
                $('#signinResponseMessage').text('Error signing in.');
            },
        });
    });

    // Show photos after 2 seconds
    setTimeout(function() {
        $('.photo').each(function(index) {
            $(this).delay(index * 2000).fadeIn(1000);
        });
    }, 2000);
});
