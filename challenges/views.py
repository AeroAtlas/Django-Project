from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect
from django.urls import reverse
from django.template.loader import render_to_string

# Create your views here.
# obj = {"january": "1", "february": "2", "march": "3", "april": "4", "may": "5", "june": "6", "july": "7", "august":"8", "september": "9", "october": "10", "november": "11", "december": "12"}
# arr = ["Get exercise", "Get healthy food"]
monthy_challenges = { 
  "january": "Get exercise", 
  "february": "Get healthy food", 
  "march": "Get exercise", 
  "april": "Get exercise", 
  "may": "Get exercise", 
  "june": "Get exercise", 
  "july": "Get exercise", 
  "august":"Get exercise", 
  "september": "Get exercise", 
  "october": "Get exercise", 
  "november": "Get exercise", 
  "december": "Get exercise"
}

def index(req):
  month_list = ""
  for month in monthy_challenges:
    month_list += f"<li><a href='{reverse('month-challenge', args=[month])}'>{month.capitalize()}</a></li>"
  res_data = f"<ul>{month_list}</ul>"
  return HttpResponse(res_data)

def month_by_num(req, month):
  months = list(monthy_challenges.keys())
  if month > len(months):
    return HttpResponseNotFound("This month number is not supported")
  else:
    redirect_month = months[month-1]
    redirect_path = reverse("month-challenge", args=[redirect_month])
    return HttpResponseRedirect(redirect_path)

def month(req, month):
  text = None
  try:
    text = monthy_challenges[month] 
    return render(req, "challenges/challenge.html", {"text": text})
  except:
    return HttpResponseNotFound("<h1>This month is not supported</h1>") 
  return HttpResponse(res_data)