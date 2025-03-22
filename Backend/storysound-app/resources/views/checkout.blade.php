<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout</title>
    <script src="https://js.stripe.com/v3/"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
            margin: 0;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            width: 350px;
            text-align: center;
        }
        h2 {
            margin-bottom: 20px;
        }
        input[type="email"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        #card-element {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 15px;
            background: #fff;
        }
        button {
            width: 100%;
            padding: 10px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background: #0056b3;
        }
        .message {
            margin-bottom: 10px;
            font-size: 14px;
        }
        .success { color: green; }
        .error { color: red; }
        .card-container {
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 5px;
            background: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Stripe Payment Checkout</h2>

        @if(session('success'))
            <p class="message success">{{ session('success') }}</p>
        @endif
        @if(session('error'))
            <p class="message error">{{ session('error') }}</p>
        @endif

        <form action="{{ route('charge') }}" method="post" id="payment-form">
            @csrf
            <input type="email" name="email" placeholder="Enter your email" required>
            <div class="card-container">
                <div id="card-element"></div>
            </div>
            <input type="hidden" name="stripeToken" id="stripeToken">
            <button type="submit">Pay $10</button>
        </form>
    </div>

    <script>
        var stripe = Stripe("{{ env('STRIPE_KEY') }}");
        var elements = stripe.elements();
        var card = elements.create('card', {
            hidePostalCode: true,
            style: {
                base: {
                    fontSize: '16px',
                    color: '#32325d',
                    fontFamily: 'Arial, sans-serif',
                    padding: '10px',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#fa755a'
                }
            }
        });
        card.mount('#card-element');

        var form = document.getElementById('payment-form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            stripe.createToken(card).then(function(result) {
                if (result.error) {
                    alert(result.error.message);
                } else {
                    document.getElementById('stripeToken').value = result.token.id;
                    form.submit();
                }
            });
        });
    </script>
</body>
</html>
