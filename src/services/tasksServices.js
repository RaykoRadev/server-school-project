import Teacher from "../models/Teacher.js";

//todo base links need to make them works
export async function getAllClasses(teacherId) {
    const data = await Teacher.findById(teacherId, { classes: 1, _id: 0 });

    return data.classes;
}
export async function createOne(linksData) {
   const data = await Teacher.updateOne(
        {
            _id: linksData._id, //teacher ID
            "classes.classId": linksData.classId,
            "classes.subjects.name": linksData.subject,
        },
        {
            $push: {
                "classes.$[c].subjects.$[s].links": {
                    text: linksData.text,
                    link: linksData.link,
                },
            },
        },
        {
            arrayFilters: [{ "c.classId": linksData.classId }, { "s.name": linksData.subject }],
        }
    );

    return data
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
