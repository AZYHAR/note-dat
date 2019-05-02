from flask import Flask

def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)

    @app.before_first_request
    def create_tables():
        db.create_all()
    
    from app import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    from model import db
    db.init_app(app)

    return app


if __name__ == "__main__":
    app = create_app("config")
    app.run(debug=True)