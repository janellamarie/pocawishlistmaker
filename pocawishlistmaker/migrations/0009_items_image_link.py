# Generated by Django 5.0.1 on 2024-06-15 01:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pocawishlistmaker', '0008_delete_urls_alter_items_price_alter_items_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='items',
            name='image_link',
            field=models.CharField(default=''),
            preserve_default=False,
        ),
    ]