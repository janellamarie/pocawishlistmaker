# Generated by Django 5.0.1 on 2024-06-15 23:51

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pocawishlistmaker', '0010_alter_tags_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wishlists',
            name='updated_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]