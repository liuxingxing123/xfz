from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group,Permission,ContentType
from apps.news.models import News,NewsCategory,Banner
from apps.course.models import Teacher,Course,CourseCategory
from apps.payinfo.models import PayInfo
from apps.course.models import CourseOrder
from apps.payinfo.models import PayInfoOrder

class Command(BaseCommand):
    def handle(self, *args, **options):
        # 1.編輯組(管理文章、管理評論，管理課程，管理輪播圖)
        edit_content_type=[
            ContentType.objects.get_for_model(News),
            ContentType.objects.get_for_model(Banner),
            ContentType.objects.get_for_model(NewsCategory),
            ContentType.objects.get_for_model(Course),
            ContentType.objects.get_for_model(CourseCategory),
            ContentType.objects.get_for_model(Teacher),
            ContentType.objects.get_for_model(PayInfo),
        ]
        edit_permissions = Permission.objects.filter(content_type__in=edit_content_type)
        editGroup=Group.objects.create(name="編輯")
        editGroup.permissions.set(edit_permissions)
        editGroup.save()
        self.stdout.write(self.style.SUCCESS("編輯分組創建成功"))
        # 2.財務組(課程訂單，付費咨詢)
        finance_content = [
            ContentType.objects.get_for_model(CourseOrder),
            ContentType.objects.get_for_model(PayInfoOrder),
        ]
        finance_permissions = Permission.objects.filter(content_type__in=finance_content)
        financeGroup = Group.objects.create(name="財務")
        financeGroup.permissions.set(finance_permissions)
        financeGroup.save()
        self.stdout.write(self.style.SUCCESS("財務組創建成功"))
        # 3.管理員組（編輯組+財務組）
        admin_permissions = edit_permissions.union(finance_permissions)
        adminGroup = Group.objects.create(name="管理員")
        adminGroup.permissions.set(admin_permissions)
        adminGroup.save()
        self.stdout.write(self.style.SUCCESS("管理員組創建成功"))
        # 超級管理員
        # self.stdout.write(self.style.SUCCESS("hello world"))