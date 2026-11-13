# Phase 0: Payload-First Security TDD

## 1. Data Invariants
- A student must belong to a verified trainer.
- Only the trainer can create or modify student core data, evaluations, and diet plans.
- A student can only view their own data and update their anamnesis and feedback, and check off meals.
- Meal templates belong to the trainer.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Read**: Attempt to read `/students/123`. (Fails Auth)
2. **Identity Spoofing on Create**: Create student with `trainerId` equal to someone else. (Fails Identity Matching)
3. **Invalid Email Login**: Student tries to access student profile with an email that doesn't match the student doc.
4. **Student Elevating Role**: Student attempting to set `isAdmin` or `role` to trainer.
5. **Update Gap**: Trainer updates student but misses schema fields or adds extra junk fields.
6. **Denial of Wallet**: Putting 1.5MB into `profilePicture` base64.
7. **Type Mismatch**: `age` as string instead of number.
8. **Unauthorized Deletion**: Student deleting their own evaluation.
9. **Cross-Tenant Access**: Trainer trying to read another trainer's student.
10. **State Bypassing**: Student updating `dietPlan` target calories.
11. **Path Variable Mismatch**: `studentId` in path doesn't match `studentId` in payload.
12. **PII Leak**: Unauthenticated user querying students where email == "x".

## 3. The Test Runner
A `firestore.rules.test.ts` file will be created to verify these payloads.
