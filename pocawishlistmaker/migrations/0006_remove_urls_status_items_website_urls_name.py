# Generated by Django 5.0.1 on 2024-06-14 22:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pocawishlistmaker', '0005_alter_urls_updated_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='urls',
            name='status',
        ),
        migrations.AddField(
            model_name='items',
            name='website',
            field=models.CharField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='urls',
            name='name',
            field=models.CharField(default=''),
            preserve_default=False,
        ),
    ]
