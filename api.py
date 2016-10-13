from model import *
import json


class apiManager():

    def __init__(self, request_to_handle, request_type):
        self.request_to_handle = request_to_handle
        self.request_type = request_type

    def handle_request(self):
        if self.request_type == 'post':
            response = self.update_db()
        if self.request_type == 'get':
            response = self.get_data()
        return response

    def get_data(self):
        all_data = {"projects": [], "tickets": {"new": [], "inProgress": [], "review": [], "done": []}}
        for project in Project.get_all():
            all_data["projects"].append(project.name)
        if self.request_to_handle != "noProjectInformationRequested":
            for ticket in Ticket.get_all_by_project(self.request_to_handle):
                all_data["tickets"][ticket.status].append(ticket.value)
        response = json.dumps(all_data)
        return response

    def update_db(self):
        all_data = {"projects": [], "tickets": {"new": [], "inProgress": [], "review": [], "done": []}}
        if self.request_to_handle['type'] == 'project':
            if self.request_to_handle['method'] == 'add':
                Project.create(
                    name=self.request_to_handle['text']
                )
            if self.request_to_handle['method'] == 'delete':
                print(self.request_to_handle['text'])
                for ticket in Ticket.get_all_by_project(self.request_to_handle['text']):
                    print(2)
                    ticket.delete_instance()
                print(3)
                Project.get_by_name(self.request_to_handle['text']).delete_instance()
                print(4)
        if self.request_to_handle['type'] == 'ticket':
            if self.request_to_handle['method'] == 'add':
                related_project = Project.get_by_name(self.request_to_handle['related'])
                Ticket.create(
                    value=self.request_to_handle['text'],
                    status=self.request_to_handle['status'],
                    related_project=related_project
                )
            if self.request_to_handle['method'] == 'delete':
                Ticket.get_for_delete(self.request_to_handle['text'], self.request_to_handle['related']).delete_instance()
            for ticket in Ticket.get_all_by_project(self.request_to_handle['related']):
                all_data["tickets"][ticket.status].append(ticket.value)
        for project in Project.get_all():
            all_data["projects"].append(project.name)
        response = json.dumps(all_data)
        return response
