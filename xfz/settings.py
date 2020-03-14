"""
Django settings for xfz project.

Generated by 'django-admin startproject' using Django 2.0.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '!@0*7z9ltln3xl3(6iq)%fhz18=p!+cq&f9vb5s=1i1u)pt*26'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['106.52.23.195','127.0.0.1']

# Django-Debug-Toolbar相关的配置
INTERNAL_IPS = ['106.52.23.195','127.0.0.1']
DEBUG_TOOLBAR_PANELS = [
    # 代表是哪个django版本
    'debug_toolbar.panels.versions.VersionsPanel',
    # 用来计时的，判断加载当前页面总共花的时间
    'debug_toolbar.panels.timer.TimerPanel',
    # 读取django中的配置信息
    'debug_toolbar.panels.settings.SettingsPanel',
    # 看到当前请求头和响应头信息
    'debug_toolbar.panels.headers.HeadersPanel',
    # 当前请求的想信息（视图函数，Cookie信息，Session信息等）
    'debug_toolbar.panels.request.RequestPanel',
    # 查看SQL语句
    'debug_toolbar.panels.sql.SQLPanel',
    # 静态文件
    'debug_toolbar.panels.staticfiles.StaticFilesPanel',
    # 模板文件
    'debug_toolbar.panels.templates.TemplatesPanel',
    # 缓存
    'debug_toolbar.panels.cache.CachePanel',
    # 信号
    'debug_toolbar.panels.signals.SignalsPanel',
    # 日志
    'debug_toolbar.panels.logging.LoggingPanel',
    # 重定向
    'debug_toolbar.panels.redirects.RedirectsPanel',
]
DEBUG_TOOLBAR_CONFIG = {
    'JQUERY_URL': ''
}

# Application definition


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'apps.xfzauth',
    'apps.news',
    'apps.cms',
    'apps.ueditor',
    'apps.course',
    'apps.payinfo',
    'rest_framework',
    'debug_toolbar',
    'haystack'
]

MIDDLEWARE = [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'xfz.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'front', 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'builtins': [
                'django.templatetags.static'
            ]
        },
    },
]

WSGI_APPLICATION = 'xfz.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': "xfz",
        'HOST': '106.52.23.195',
        'PORT': '3306',
        'USER': 'root',
        'PASSWORD': '123456'
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'xfzauth.User'

# 缓存配置
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': '127.0.0.1:11211'
    }
}

# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'front', 'dist')
]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
# 上传到字节的服务器
UEDITOR_UPLOAD_TO_SERVER = True
UEDITOR_UPLOAD_PATH = MEDIA_ROOT

# 七牛云的SecretKey : i0NI4XaDdMAp3ugSIa3YLAYCZ8MRg6VrKdyln4Jf
# 七牛云的AccessKey : plVdjRxYfaXdcuaBBrqLa4yCLMsLksXUsyWIT6tj
# Qiniu配置
QINIU_ACCESS_KEY = 'plVdjRxYfaXdcuaBBrqLa4yCLMsLksXUsyWIT6tj'
QINIU_SECRET_KEY = 'i0NI4XaDdMAp3ugSIa3YLAYCZ8MRg6VrKdyln4Jf'
QINIU_BUCKET_NAME = 'liuxingxing'
QINIU_DOMAIN = 'http://pwlbcmhg8.bkt.clouddn.com/'
# 七牛和自己的服务器，最少要配置一个  如果配置两个会在七牛云服务器和自己的本地服务器都保存一份
# UEditor配置
UEDITOR_UPLOAD_TO_QINIU = True
UEDITOR_QINIU_ACCESS_KEY = QINIU_ACCESS_KEY
UEDITOR_QINIU_SECRET_KEY = QINIU_SECRET_KEY
UEDITOR_QINIU_BUCKET_NAME = QINIU_BUCKET_NAME
UEDITOR_QINIU_DOMAIN = QINIU_DOMAIN

UEDITOR_CONFIG_PATH = os.path.join(BASE_DIR, 'front', 'dist', 'ueditor', 'config.json')

# 一次加载多少篇文章
ONE_PAGE_NEWS_COUNT = 2

# 百度云的配置
# 控制台->用户中心->用户ID
BAIDU_CLOUD_USER_ID = 'ee9b674701154faab35312bc3c8c166a'
# 点播VOD->全局设置->发布设置->安全设置->UserKey
BAIDU_CLOUD_USER_KEY = 'b2c1d6a3bc3a4774'

HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'apps.news.whoosh_cn_backend.WhooshEngine',
        "PATH": os.path.join(BASE_DIR, 'whoosh_index')
    }
}

# 增刪改查都會重新創建索引
HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.RealtimeSignalProcessor'
