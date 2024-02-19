export const fieldsSchema = [
    {
        "label": "نام",
        "name": "name",
        "placeholder": "نام را وارد نمایید",
        "type": "text",
        "initialValue": "",
        "defaultValue": null,
        "grid": {
            "xs": 3
        }
    },
    {
        "label": "بازه تاریخ",
        "name": "date-range",
        "placeholder": "نام را وارد نمایید",
        "type": "date-range",
        "initialValue": "",
        "defaultValue": null,
        "grid": {
            "xs": 3
        }
    },
    {
        "label": "نام خانوادگی ",
        "name": "lastname",
        "placeholder": "نام خانوادگی را وارد نمایید",
        "type": "text",
        "initialValue": "",
        "defaultValue": null,
        "grid": {
            "xs": 3
        }
    },
    {
        "label": "وضعیت",
        "name": "threeStateCheckbox",
        "placeholder": "نام خانوادگی را وارد نمایید",
        "type": "three-state-checkbox",
        "initialValue": "",
        "defaultValue": null,
        "grid": {
            "xs": 3
        }
    },
    {
        "label": "جنسیت",
        "name": "gender",
        "placeholder": "جنسیت را وارد کنید",
        "type": "dropdown",
        "initialValue": "",
        "defaultValue": null,
        "options": [
            {
                "label": "همه",
                "value": 3
            },
            {
                "label": "مرد",
                "value": 1
            },
            {
                "label": "زن",
                "value": 2
            }
        ],
        "grid": {
            "xs": 3
        }
    },
    {
        "label": "انتخاب نوع ",
        "name": "type",
        "placeholder": "نوع را وارد نمایید ",
        "type": "autocomplete",
        "initialValue": "",
        "defaultValue": null,
        "options": [
            {
                "label": "همه",
                "value": 3
            },
            {
                "label": "نوع ۱",
                "value": 1
            },
            {
                "label": "نوع ۲",
                "value": 2
            }
        ],
        "grid": {
            "xs": 3
        }
    },
    {
        "label": "تاریخ ",
        "name": "startdate",
        "placeholder": "تاریخ شروع ",
        "type": "calendar",
        "initialValue": "",
        "defaultValue": null,
        "grid": {
            "xs": 3
        }
    },
    {
        "label": "دسته بندی",
        "name": "group",
        "placeholder": "دسته بندی  ",
        "type": "radiogroup",
        "inputType": "checkbox",
        "initialValue": "",
        "defaultValue": null,
        "grid": {
            "xs": 3
        },
        "options": [
            {
                "label": "اول",
                "value": "اول"
            },
            {
                "label": "دوم",
                "value": "دوم"
            },
            {
                "label": "سوم",
                "value": "سوم"
            }
        ]
    },
    {
        "label": "آپلود فایل",
        "name": "file",
        "placeholder": "فایل رو آپلود نمایید",
        "type": "file",
        "initialValue": "",
        "defaultValue": null,
        "grid": {
            "xs": 3
        }
    },
    {
        "label": "فعال",
        "name": "active",
        "type": "checkbox",
        "initialValue": false,
        "defaultValue": null,
        "grid": {
            "xs": 3
        }
    },
]