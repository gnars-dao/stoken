"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountName = require("../accountname");
describe('accountname', function () {
    it('matches', function () {
        var samplekey = "FIO7isxEua78KPVbGzKemH4nj2bWE52gqj8Hkac3tc7jKNvpfWzYS";
        var accountHash = AccountName.accountHash(samplekey);
        expect(accountHash).toEqual('p4hc54ppiofx');
    });
});
//# sourceMappingURL=accountname.test.js.map