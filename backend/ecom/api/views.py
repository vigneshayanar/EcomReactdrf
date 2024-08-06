from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Cart,Cartitem,Category,Product
from .serilizers import CartItemsserilaizer,Productserializer,Cartserilsizer,Categoryserializers,Userserializer
from rest_framework import viewsets,status

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
    