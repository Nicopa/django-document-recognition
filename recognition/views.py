from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.http import Http404, HttpResponseBadRequest, HttpResponseServerError
import json
from .services import recognize as recognize_service

def index(request):
    template = loader.get_template("recognition/index.html")
    return HttpResponse(template.render(None, request))

def recognize(request):
    if request.method != "POST":
        raise Http404()
    data = json.loads(request.body.decode("utf-8"))
    fields = data.get("fields")
    if not fields:
        return HttpResponseBadRequest("Missing fields")
    base64_encoded_image = data.get("file")
    if not base64_encoded_image:
        return HttpResponseBadRequest("Missing image")
    try:
        recognized_data = recognize_service(fields, base64_encoded_image)
        return JsonResponse({
            "recognized_data": recognized_data,
        })
    except Exception as e:
        return HttpResponseServerError(f"{str(e)}")