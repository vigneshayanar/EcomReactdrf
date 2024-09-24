from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Cart,Cartitem,Category,Product
from .serilizers import CartItemsserilaizer,Productserializer,Cartserilsizer,Categoryserializers,Userserializer
from rest_framework import viewsets,status
from rest_framework.decorators import api_view
from decimal import Decimal
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Cart
from django.conf import settings
import paypalrestsdk

paypalrestsdk.configure({
    "mode": settings.PAYPAL_MODE,  # Updated to reflect the correct settings attribute
    "client_id": settings.PAYPAL_CLIENT_ID,
    "client_secret": settings.PAYPAL_CLIENT_SECRET
})
class CategoryViewset(viewsets.ModelViewSet):
    queryset=Category.objects.all()
    serializer_class=Categoryserializers

class prductViewset(viewsets.ModelViewSet):
    queryset=Product.objects.all()
    serializer_class=Productserializer

    def get_queryset(self):
        queryset=Product.objects.all()
        categoery_id=self.request.query_params.get('category')
        if categoery_id:
            queryset=queryset.filter(categoery_id=categoery_id)
        return queryset

class CartitemViewset(viewsets.ModelViewSet):
    queryset = Cartitem.objects.all()
    serializer_class = CartItemsserilaizer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        try:
            user_cart = Cart.objects.get(user=self.request.user)
            print("hii")
            product = serializer.validated_data['Product']
            quantity = serializer.validated_data['quantity']
            print(product)
            cartitem, created = Cartitem.objects.get_or_create(cart=user_cart, Product=product)
            if not created:
                cartitem.quantity += quantity
                cartitem.save()
                print("Cartitem quantity updated.")
            else:
                cartitem.quantity = quantity
                cartitem.save()
                print("Cartitem created.")
        except Exception as e:
            raise Exception(f"Error creating cartitem: {str(e)}")

    def get_queryset(self):
        user = self.request.user
        try:
            user_cart = Cart.objects.get(user=user)
            return Cartitem.objects.filter(cart=user_cart)
        except Cart.DoesNotExist:
            return Cartitem.objects.none()

class  RegisterView(APIView):
    permission_classes=[AllowAny]

    def post(self,request):
        serializer=Userserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def initiate_paypal_payments(request):
    try:
        user = request.user
        print(f"User: {user}")
        
        cart = Cart.objects.filter(user=user).first()
        if not cart:
            return Response({"error": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)

        cart_items = Cartitem.objects.filter(cart=cart)
        if not cart_items.exists():
            return Response({"error": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        amount = sum(item.Product.price * item.quantity for item in cart_items)
        tax = Decimal("4.00")
        total_amount = Decimal(amount) + tax
        print(f"Amount: {amount}, Total Amount: {total_amount}")

        payment = paypalrestsdk.Payment({
            'intent': "sale",
            'payer': {
                'payment_method': 'paypal'
            },
            'transactions': [{
                'amount': {
                    'total': str(total_amount),
                    'currency': 'USD'
                },
                'description': 'Payment for cart items.'
            }],
            'redirect_urls': {
                'return_url': 'http://localhost:5173/success',
                'cancel_url': 'http://localhost:8000/cancel'
            }
        })

        if payment.create():
            print("Payment created successfully.")
            for link in payment.links:
                if link.rel == 'approval_url':
                    approval_url = str(link.href)
                    return Response({"approval_url": approval_url},status=status.HTTP_201_CREATED)
        else:
            print(f"Payment creation failed: {payment.error}")
            return Response({"error": payment.error}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return Response({"error": "Something went wrong."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
