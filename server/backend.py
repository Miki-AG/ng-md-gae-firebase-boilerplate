"""This is a javadoc style."""
import webapp2
import logging
from webapp2_extras import jinja2 as jinja2_module

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

        user_agent = self.request.headers['user-agent']

        # Bot
        if ('google' in user_agent or
                'facebookexternalhit' in user_agent or
                'Facebot' in user_agent):
            if split[0] == 'share':
                tags = '#tag1, #tag2, #tag3'
                context = {
                    'tags': tags,
                    'image': '/static/img/family_pants.jpg',
                    'share_url': '/share/{}/{}'.format(split[1], split[2])
                }
                self.render_response('share_template.html', **context)
            else:
                return 'Unauthorized', 401

        # Not bot
        else:
            context = {}
            self.render_response('index.html', **context)


application = webapp2.WSGIApplication([
    # ('/upload_file', PhotoUploadHandler),
    # ('/serve_file/([^/]+)?', ViewPhotoHandler),
    ('/.*', TemplateService),
], debug=True)
