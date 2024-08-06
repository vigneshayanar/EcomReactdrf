from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
class Category(models.Model):
    name=models.CharField(max_length=100,unique=True)
    images=models.ImageField(upload_to='product/',default='default_image.jpg')
    description=models.TextField(max_length=3000,default="this category is good")

    def __str__(self):
        return self.name

class Product(models.Model):
    category=models.ForeignKey(Category,on_delete=models.CASCADE)
    name=models.CharField(max_length=100)
    description=models.TextField()
    price=models.DecimalField(max_digits=10,decimal_places=2)
    image=models.ImageField(upload_to='product/')

    def __str__(self):
        return self.name


class Cart(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return f'Cart for {self.user.username}'

class Cartitem(models.Model):
    Product=models.ForeignKey(Product,on_delete=models.CASCADE)
    cart=models.ForeignKey(Cart,on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField(default=1)

    def __str__(self) -> str:
        return f'{self.Product.name} ({self.quantity})'


def create_cart(sender,instance,created,**kwargs):
    if created:
        Cart.objects.create(user=instance)

post_save.connect(create_cart,sender=User)