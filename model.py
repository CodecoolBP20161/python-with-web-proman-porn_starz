from peewee import *


db = PostgresqlDatabase('csibi', user='csibi')


class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = db


class Project(BaseModel):

    project_id = PrimaryKeyField()
    name = CharField(unique=True)

    @classmethod
    def get_all(cls):
        return cls.select()

    @classmethod
    def get_by_name(cls, name):
        return cls.select().where(cls.name == name).get()


class Ticket(BaseModel):

    ticket_id = PrimaryKeyField()
    value = CharField()
    status = CharField()
    related_project = ForeignKeyField(Project)

    @classmethod
    def get_all_by_project(cls, project):
        project_found = Project.get_by_name(project)
        return cls.select().where(cls.related_project == project_found)

    @classmethod
    def get_by_name(cls, name):
        return cls.select().where(cls.name == name).get()

    @classmethod
    def get_for_delete(cls, name, related):
        project_found = Project.get_by_name(related)
        return cls.select().where(cls.value == name, cls.related_project == project_found).get()


def init_db():
    db.connect()
    db.create_tables([Project, Ticket], safe=True)


# User.create(
#     name="bela",
#     email='lajos'
# )
# print(User.select().get().name)
