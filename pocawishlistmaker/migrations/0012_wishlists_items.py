# Generated by Django 5.0.1 on 2024-06-16 00:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pocawishlistmaker', '0011_alter_wishlists_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='wishlists',
            name='items',
            field=models.ManyToManyField(to='pocawishlistmaker.items'),
        ),
    ]
