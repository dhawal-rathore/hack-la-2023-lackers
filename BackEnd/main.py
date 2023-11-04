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
        print(course)
    except:
        pass

stat_assignments = curr_courses[-1].get_assignments()

for assignment in stat_assignments:
    # convert string due_at to datetime object and check if it is past due

    if assignment.attributes['name'] == "Midterm 1 - 2023W1":
        print(assignment.attributes)
    
    if assignment.attributes['due_at'] is None:
        print(f"{assignment.attributes['name']} has no due date with max points: {assignment.attributes['points_possible']}")
        continue

    assignment.attributes['due_at'] = datetime.datetime.strptime(assignment.attributes['due_at'], '%Y-%m-%dT%H:%M:%SZ')
    if assignment.attributes['due_at'] > datetime.datetime.now():
        print(f"{assignment.attributes['name']} is due on {assignment.attributes['due_at']} with max points: {assignment.attributes['points_possible']}")
    else:
        print(f"{assignment.attributes['name']} was due on {assignment.attributes['due_at']} with max points: {assignment.attributes['points_possible']}")

print()
print()
print()
print()
print()

announcements = canvas.get_announcements(context_codes=[f"course_{curr_courses[4].id}"]) 
print(len(list(announcements)))


for a in announcements:
    html_text = BeautifulSoup(a.attributes['message'], 'html.parser')
    p_tags = html_text.find_all('p')
    message = ' '.join([p.get_text() for p in p_tags])
    print(f"{a.attributes['title']}:\n{message}")
    print()
    print()



# print(midterm)

# print(len(list(curr_courses_quizzes[126181])))
# stat_quizes = []

# for quiz in curr_courses_quizzes[126181]:
#     stat_quizes.append(quiz)

# for quiz in stat_quizes:
#     print(quiz.attributes)


