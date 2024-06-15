# Generated by Django 5.0.1 on 2024-06-14 19:59

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pocawishlistmaker', '0003_alter_items_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='URLs',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('url', models.CharField()),
                ('website', models.CharField()),
                ('status', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField()),
            ],
        ),
    ]