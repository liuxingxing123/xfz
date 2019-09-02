from rest_framework import serializers
from apps.xfzauth.serializers import UserSerializer
from .models import News,NewsCategory,Comment,Banner

class NewsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = ('id','name')

class NewsSerizlizer(serializers.ModelSerializer):
    category = NewsCategorySerializer()
    author = UserSerializer()
    class Meta:
        model = News
        # 此时首页的地方用不到内容  所以不添加 减少网络传输 因为内容一般体积较大
        fields = ('id', 'title', 'desc', 'thumbnail', 'pub_time', 'category', 'author')

class CommentSerizlizer(serializers.ModelSerializer):
    author = UserSerializer()
    class Meta:
        model = Comment
        fields = ('id','content','author','pub_time')

class BannerSerizlizer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ('id','image_url','link_to','priority')
