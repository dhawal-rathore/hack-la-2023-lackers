from canvasapi import Canvas
from bs4 import BeautifulSoup
import datetime

API_URL = "https://canvas.ubc.ca"
API_KEY = "11224~qDFB37QAxQMzANwXVU1cWElrpgDEjSXAYeoxLZL3Zx5xLEnLiRHmqvL3NNhZUbPK"

canvas = Canvas(API_URL, API_KEY)

courses = canvas.get_courses(enrollment_status='active')
curr_courses = []

for course in courses:
    try:
        course.name
        curr_courses.append(course)
    except:
        pass

stat_assignments = curr_courses[-1].get_assignments()

for course in curr_courses:
    print(f"Course Name: {course}")
    print()
    print(f"Assignments:")
    
    if (len(list(course.get_assignments())) == 0):
        print("No assignments")
        print()
        continue
    for assignment in course.get_assignments():
        if assignment.attributes['due_at'] is None:
            print(f"{assignment.attributes['name']} has no due date with max points: {assignment.attributes['points_possible']}")
            continue

        assignment.attributes['due_at'] = datetime.datetime.strptime(assignment.attributes['due_at'], '%Y-%m-%dT%H:%M:%SZ')
        if assignment.attributes['due_at'] > datetime.datetime.now():
            print(f"{assignment.attributes['name']} is due on {assignment.attributes['due_at']} with max points: {assignment.attributes['points_possible']}")
        else:
            print(f"{assignment.attributes['name']} was due on {assignment.attributes['due_at']} with max points: {assignment.attributes['points_possible']}")

    print()

    print("Announcements:")
    announcements = canvas.get_announcements(context_codes=[f"course_{course.id}"])

    if (len(list(announcements)) == 0):
        print("No announcements")
        print()
        continue

    for a in announcements:
        html_text = BeautifulSoup(a.attributes['message'], 'html.parser')
        p_tags = html_text.find_all('p')
        message = ' '.join([p.get_text() for p in p_tags])
        print(f"{a.attributes['title']}:\n{message}")

    print()

