# Generated by Django 5.0.1 on 2024-06-14 22:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pocawishlistmaker', '0006_remove_urls_status_items_website_urls_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='urls',
            name='name',
        ),
    ]
