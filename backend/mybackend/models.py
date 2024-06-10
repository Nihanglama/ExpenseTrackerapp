from django.db import models
from django.contrib.auth.models import User 
from django.utils import timezone


class Business(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    name=models.CharField(max_length=200,unique=True)
    def __str__(self):
        return self.name

class Transaction(models.Model):
    mytype=[
        ('Withdraw','withdraw'),
        ('Deposit','deposit')
    ]

    gateways=[
        ("Esewa","esewa"),
        ("Khalti","khalti"),
        ("Fonepay","fonepay"),
        ("Imepay","Imepay"),
        ("Bank","bank"),
        ("Cash","cash"),
    ]
    name=models.ForeignKey(Business,on_delete=models.CASCADE)
    date=models.DateField(default=timezone.now)
    types=models.CharField(max_length=100)
    contact_name=models.CharField(max_length=200)
    amount=models.DecimalField(max_digits=1000,decimal_places=2)
    remarks=models.CharField(max_length=200)
    payment_category=models.CharField(max_length=100,choices=gateways)

    def __str__(self) -> str:
        return self.contact_name

