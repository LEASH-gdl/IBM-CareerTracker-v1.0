from flask import Blueprint,request
import pandas as pd
import numpy as np
import requests
import matplotlib.pyplot as plt
from matplotlib import style
import statsmodels.formula.api as smf
import os
import json

routes_files = Blueprint("routes_files",__name__)


@routes_files.get("/datascience")
def data():
    jsonlogin = { "email": os.environ.get("USER_MAIL"),
                "password": os.environ.get("USER_PASSWORD")
                }

    x = requests.post(str(os.environ.get("BACKEND_URL"))+"/sso/login", json= jsonlogin)
    data = x.json()
    #print(data["jwt"])

    headers = {'Authorization':  str(data["jwt"])}

    y = requests.get(str(os.environ.get("BACKEND_URL"))+"/v1/certifications",headers=headers)
    users = requests.get(str(os.environ.get("BACKEND_URL"))+"/v1/users",headers=headers)

    #print(y.text)
    df_users = pd.DataFrame.from_dict(users.json())
    active_users = df_users["user_id"].value_counts().count()
    users_per_city = json.loads(df_users.pivot_table(values="city", index=df_users["city"], columns='country', aggfunc='count').to_json())
    users_per_city2 = {}
    for key1 in users_per_city:
        users_per_city2[key1]={}
        for key2 in users_per_city[key1]:
            if users_per_city[key1][key2] != None:
                users_per_city2[key1][key2] = users_per_city[key1][key2]
    df = pd.DataFrame.from_dict(y.json())
    externalvsbadges = df["cert_type"].value_counts()
    usercertifications =  df["user_id"].value_counts()
    dfcategories = df["cert_categ"].value_counts()
    cert_year =pd.to_datetime(df["issue_date"]).dt.year.value_counts()
    df2 = pd.DataFrame({'year':cert_year.index, 'certifications':cert_year.values})
    modelo=smf.ols(formula='certifications ~ year', data=df2)
    modelo=modelo.fit()

    x1 = df2["year"]
    y1 = modelo.params[0] + modelo.params[1] * x1
    y1 = y1.rename(x1)

    jsonfile = { "badges_external": json.loads(externalvsbadges.to_json()),
            "total_employees": 3000,
            "users_w_certifications":  int(usercertifications.count()),
            "active_users": int(active_users),
            "users_per_city": users_per_city2,
            "average_certifications": round(usercertifications.mean()),
            "certifications_per_category": json.loads(dfcategories.to_json()),
            "model":json.loads(y1.to_json()),
            "real_data":json.loads(cert_year.to_json())}
    return jsonfile
