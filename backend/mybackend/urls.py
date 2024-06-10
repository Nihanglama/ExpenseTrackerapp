from django.urls import path
from .views import add_business,register,edit_transaction,login,delete_business,list_business,list_transaction,transact,logout,delete_transaction
urlpatterns=[
    path("api/register",register),
    path("api/login",login),
    path("api/logout",logout),
    path("api/add_business",add_business),
    path("api/transact",transact),
    path("api/list_business",list_business),
    path("api/list_transaction/<str:name>",list_transaction),
    path("api/delete/<str:name>",delete_business),
    path("api/deletes/<int:id>",delete_transaction),
    path("api/edit_transaction/<int:id>",edit_transaction)
]