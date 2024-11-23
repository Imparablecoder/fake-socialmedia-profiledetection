const FakeProfileReport = artifacts.require("FakeProfileReport");

module.exports = function (deployer) {
    deployer.deploy(FakeProfileReport);
};
