import Student from "../models/Students.js";
import Teacher from "../models/Teacher.js";

export async function getAllClasses(teacherId) {
    const data = await Teacher.findById(teacherId, { classes: 1, _id: 0 });

    return data.classes;
}

export async function getOneClass(teacherId, classId) {
    const data = await Teacher.findOne(
        {
            _id: teacherId,
            "classes.classId": classId,
        },
        {
            "classes.$": 1,
            _id: 0,
        }
    );

    return data;
}

export async function getAllStudents(teacherId) {
    const data = await Student.find({ teacherId }); // if its needed can populate class

    return data;
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
            arrayFilters: [
                { "c.classId": linksData.classId },
                { "s.name": linksData.subject },
            ],
        }
    );

    return data;
}

export async function getOneLink(teacherId, classId, subjectId, linkId) {
    const data = await Teacher.aggregate([
        { $match: { _id: teacherId } },

        { $unwind: "$classes" },
        { $match: { "classes.classId": classId } },

        { $unwind: "$classes.subjects" },
        { $match: { "classes.subjects._id": subjectId } },

        { $unwind: "$classes.subjects.links" },
        { $match: { "classes.subjects.links._id": linkId } },

        {
            $replaceRoot: {
                newRoot: "$classes.subjects.links",
            },
        },
    ]);

    return data[0];
}

//todo base links need to make them works

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

export async function deleteOne(teacherId, classId, subjectId, linkId) {
    const data = await Teacher.updateOne(
        { _id: teacherId },
        {
            $pull: {
                "classes.$[c].subjects.$[s].links": {
                    _id: linkId,
                },
            },
        },
        {
            arrayFilters: [{ "c.classId": classId }, { "s._id": subjectId }],
        }
    );

    return data;
}
