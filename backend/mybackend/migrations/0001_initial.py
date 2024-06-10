# Generated by Django 5.0 on 2024-06-03 15:47

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Business",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Transaction",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("types", models.CharField(max_length=100)),
                ("contact_name", models.CharField(max_length=200)),
                ("amount", models.DecimalField(decimal_places=2, max_digits=1000)),
                ("remarks", models.CharField(max_length=200)),
                (
                    "payment_category",
                    models.CharField(
                        choices=[
                            ("Esewa", "esewa"),
                            ("Khalti", "khalti"),
                            ("Fonepay", "fonepay"),
                            ("Imepay", "Imepay"),
                            ("Bank", "bank"),
                        ],
                        max_length=100,
                    ),
                ),
                (
                    "name",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="mybackend.business",
                    ),
                ),
            ],
        ),
    ]