import Teacher from "../models/Teacher.js";

//todo base links need to make them works
export async function getAllClasses(teacherId) {
    const data = await Teacher.findById(teacherId, { classes: 1, _id: 0 });

    return data.classes;
}
export async function createOne(data) {
    await Teacher.updateOne(
        {
            _id: teacherId,
            "classes.classId": classId,
            "classes.subjects.name": subjectName,
        },
        {
            $push: {
                "classes.$[c].subjects.$[s].links": {
                    text: "Algebra basics",
                    link: "https://example.com",
                },
            },
        },
        {
            arrayFilters: [{ "c.classId": classId }, { "s.name": subjectName }],
        }
    );
}

export async function editOne(data) {
    await Teacher.updateOne(
        {
            _id: teacherId,
        },
        {
            $set: {
                "classes.$[c].subjects.$[s].links.$[l].text": "Updated text",
                "classes.$[c].subjects.$[s].links.$[l].link":
                    "https://new-link.com",
            },
        },
        {
            arrayFilters: [
                { "c.classId": classId },
                { "s.name": subjectName },
                { "l._id": linkId },
            ],
        }
    );
}

export async function deleteOne(data) {
    await Teacher.updateOne(
        {
            _id: teacherId,
        },
        {
            $pull: {
                "classes.$[c].subjects.$[s].links": {
                    _id: linkId,
                },
            },
        },
        {
            arrayFilters: [{ "c.classId": classId }, { "s.name": subjectName }],
        }
    );
}
