"""This is a javadoc style."""
import webapp2
import logging
from webapp2_extras import jinja2 as jinja2_module
from google.appengine.ext.webapp import blobstore_handlers
# from google.appengine.ext import ndb
import json
from google.appengine.ext import blobstore
from api_heroes import Hero

class TemplateHandler(webapp2.RequestHandler):
    """Module that provides rendered index.html."""

    @webapp2.cached_property
    def jinja2(self):
        """Returns a Jinja2 renderer cached in the app registry."""
        return jinja2_module.get_jinja2(app=self.app)

    def render_response(self, _template, **context):
        """Renders a template and writes the result to the response.

        Args:
            _template: Template to render.
        """

        env = jinja2_module.jinja2.Environment(
            loader=jinja2_module.jinja2.FileSystemLoader('dist'))
        template = env.get_template(_template)

        rendered = self.jinja2.render_template(template, **context)
        self.response.write(rendered)

class TemplateService(TemplateHandler):
    """Returns rendered templates."""
    def get(self):
        """Returns template."""
        split = self.request.path_info[1:].split('/')
        logging.info("url: {}".format(self.request.url))
        logging.info("path_info: {}".format(self.request.path_info))
        logging.info("split: {}".format(split))
        #user_agent = self.request.headers['user-agent']
        # Bot
        #if ('google' in user_agent or
        #        'facebookexternalhit' in user_agent or
        #        'Facebot' in user_agent):
        #    if split[0] == 'share':
        #        tags = '#tag1, #tag2, #tag3'
        #        context = {
        #            'tags': tags,
        #            'image': '/static/img/family_pants.jpg',
        #            'share_url': '/share/{}/{}'.format(split[1], split[2])
        #        }
        #        self.render_response('share_template.html', **context)
        #    else:
        #        return 'Unauthorized', 401

        # Not bot
        #else:
        context = {}
        logging.info("-------------------- rendering: index.html")
        self.render_response('index.html', **context)

class GenerateUploadUrlHandler(webapp2.RequestHandler):
    def get(self):
        logging.info('GenerateUploadUrlHandler')
        response = []
        url = blobstore.create_upload_url('/upload_photo')
        item = {}
        item['upload_url'] = url
        response.append(item)
        self.response.write(json.dumps(response))

class PhotoUploadHandler(blobstore_handlers.BlobstoreUploadHandler):
    def post(self):
        upload = self.get_uploads()[0]
        body = self.request.body.split()
        iterator = iter(body)
        for word in iterator:
            if word == 'name="hero-id"':
                heroId = int(next(iterator))
                hero = Hero.get_by_id(heroId)
                hero.blob_key = upload.key()
                hero.put()
        self.response.write(json.dumps({
            'url':'/view_photo/%s' % upload.key(),
            'blob_key' : '%s' % upload.key()
            }))

class ViewPhotoHandler(blobstore_handlers.BlobstoreDownloadHandler):
    def get(self, blob_key):
        if not blobstore.get(blob_key):
            self.error(404)
        else:
            self.send_blob(blob_key)

application = webapp2.WSGIApplication([
    # ('/upload', PhotoUploadHandler),
    ('/upload_photo', PhotoUploadHandler),
    ('/get_upload_url', GenerateUploadUrlHandler),
    ('/view_photo/([^/]+)?', ViewPhotoHandler),

    # ('/_ah/upload', PhotoUploadHandler),
    # ('/serve_file/([^/]+)?', ViewPhotoHandler),
    ('/.*', TemplateService),
], debug=True)
