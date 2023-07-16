export default () => {
    return `<!doctype html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="Content-Security-Policy" content="img-src http://localhost:3001 'self' data:;">
            <link rel="stylesheet" type="text/css" href="/dist/assets/css/bootstrap.min.css">
            <link href="/dist/assets/css/font-awesome.min.css" rel="stylesheet" type="text/css">
            <link rel="stylesheet" type="text/css" href="/dist/assets/css/owl.carousel.css">
            <link rel="stylesheet" type="text/css" href="/dist/assets/css/owl.theme.default.css">
            <link rel="stylesheet" type="text/css" href="/dist/assets/css/animate.css">
            <link rel="stylesheet" type="text/css" href="/dist/assets/css/main_styles.css">
            <title>Online Clothing Store</title>
            
        </head>
        <body>
            <div id="root"> </div>
            <script src="/dist/assets/js/jquery-3.2.1.min.js"></script>
            <script src="/dist/assets/js/popper.js"></script>
            <script src="/dist/assets/js/bootstrap.min.js"></script>
            <script src="/dist/assets/js/isotope.pkgd.min.js"></script>
            <script src="/dist/assets/js/owl.carousel.js"></script>
            <script src="/dist/assets/js/easing.js"></script>
            <script src="/dist/assets/js/custom.js"></script>

        
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            <script type="text/javascript" src="/dist/bundle.js">
            </script>
        </body>
    </html>`
}